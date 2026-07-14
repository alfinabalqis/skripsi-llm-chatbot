#!/usr/bin/env python3
"""
convert_rules_to_js.py
Mengonversi outputs/rules/rules.py (hasil training chefboost) menjadi
api/decisionTree.js yang mengembalikan { provider, rulePath }.

rulePath berisi daftar kondisi if-then yang dilalui dari akar sampai daun,
dalam bentuk teks yang dapat dibaca (mis. "success_rate_Vinotek > 0.0"),
sehingga sistem dapat menampilkan dasar rekomendasi sesuai Bab I-III skripsi.

Pemakaian:
    python convert_rules_to_js.py [path_rules.py] [path_output.js]
Default:
    python convert_rules_to_js.py outputs/rules/rules.py api/decisionTree.js
"""
import re
import sys
import pathlib
from datetime import date

DEF_RE = re.compile(r"^def\s+findDecision\s*\(obj\)\s*:\s*#(?P<names>.*)$")
COND_RE = re.compile(
    r"^(?P<kw>if|elif)\s+obj\[(?P<idx>\d+)\]\s*(?P<op>==|!=|<=|>=|<|>)\s*"
    r"(?P<val>'[^']*'|\"[^\"]*\"|[-+0-9.eE]+)\s*:\s*"
    r"(?:return\s+(?P<ret>'[^']*'|\"[^\"]*\"))?\s*$"
)
ELSE_RE = re.compile(r"^else\s*:\s*(?:return\s+(?P<ret>'[^']*'|\"[^\"]*\"))?\s*$")
RET_RE = re.compile(r"^return\s+(?P<ret>'[^']*'|\"[^\"]*\")\s*$")


def js_string(py_quoted: str) -> str:
    """'Privy' atau \"Privy\" -> \"Privy\" (kutip ganda JS)."""
    return '"' + py_quoted[1:-1].replace('"', '\\"') + '"'


def main() -> None:
    src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "outputs/rules/rules.py")
    dst = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "api/decisionTree.js")

    lines = src.read_text(encoding="utf-8").splitlines()

    feature_names: dict[int, str] = {}
    body: list[str] = []
    stack: list[int] = []  # indent (spasi) tiap blok yang masih terbuka

    def level() -> int:
        return len(stack)

    def emit(s: str, lvl: int) -> None:
        body.append("  " * (lvl + 1) + s)

    def cond_js(idx: str, op: str, val: str) -> str:
        v = js_string(val) if val[0] in "'\"" else val
        js_op = {"==": "===", "!=": "!=="}.get(op, op)
        return f"obj[{idx}] {js_op} {v}"

    def cond_label(idx: str, op: str, val: str) -> str:
        name = feature_names.get(int(idx), f"fitur_{idx}")
        v = val[1:-1] if val[0] in "'\"" else val
        return f"{name} {op} {v}"

    def emit_return(ret: str, lvl: int) -> None:
        emit(f"return leaf({js_string(ret)});", lvl)

    for raw in lines:
        stripped = raw.strip()
        if not stripped:
            continue

        m = DEF_RE.match(stripped)
        if m:
            for i, n in re.findall(r"obj\[(\d+)\]:\s*([A-Za-z0-9_+\-. ]+)", m.group("names")):
                feature_names[int(i)] = n.strip()
            continue

        if stripped.startswith("#"):
            continue

        indent = len(raw) - len(raw.lstrip())

        m = COND_RE.match(stripped)
        if m:
            kw, idx, op, val, ret = m.group("kw", "idx", "op", "val", "ret")
            if kw == "if":
                while stack and indent <= stack[-1]:
                    stack.pop()
                    emit("}", level())
                emit(f"if ({cond_js(idx, op, val)}) {{", level())
                stack.append(indent)
            else:  # elif -> rantai } else if
                while stack and indent < stack[-1]:
                    stack.pop()
                    emit("}", level())
                body.append("  " * level() + f"}} else if ({cond_js(idx, op, val)}) {{")
            emit(f'rulePath.push("{cond_label(idx, op, val)}");', level())
            if ret:
                emit_return(ret, level())
            continue

        m = ELSE_RE.match(stripped)
        if m:
            while stack and indent < stack[-1]:
                stack.pop()
                emit("}", level())
            body.append("  " * level() + "} else {")
            if m.group("ret"):
                emit_return(m.group("ret"), level())
            continue

        m = RET_RE.match(stripped)
        if m:
            while stack and indent <= stack[-1]:
                stack.pop()
                emit("}", level())
            emit_return(m.group("ret"), level())
            continue

        raise ValueError(f"Baris tidak dikenali oleh converter: {raw!r}")

    while stack:
        stack.pop()
        emit("}", level())

    names_ordered = [feature_names[i] for i in sorted(feature_names)]
    feature_names_js = ",\n".join(f'  "{n}"' for n in names_ordered)

    header_comment = (
        "/**\n"
        " * Decision tree hasil training C4.5 (chefboost), dikonversi otomatis\n"
        f" * dari {src.as_posix()} oleh convert_rules_to_js.py pada {date.today().isoformat()}.\n"
        " * JANGAN diedit manual - jalankan ulang converter setiap kali retrain.\n"
        " *\n"
        " * findDecision(obj) mengembalikan objek:\n"
        " *   provider : label vendor hasil klasifikasi C4.5\n"
        " *   rulePath : daftar kondisi if-then yang dilalui dari akar ke daun\n"
        " */\n"
    )

    output = (
        header_comment
        + "export const FEATURE_NAMES = [\n"
        + feature_names_js
        + ",\n];\n\n"
        + "export function findDecision(obj) {\n"
        + "  const rulePath = [];\n"
        + "  const leaf = (provider) => ({ provider, rulePath });\n\n"
        + "\n".join(body)
        + "\n}\n\n"
        + "// Kompatibilitas mundur: pemanggil lama yang hanya butuh label string.\n"
        + "export function findDecisionLabel(obj) {\n"
        + "  return findDecision(obj).provider;\n"
        + "}\n"
    )

    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(output, encoding="utf-8")
    print(f"OK: {dst} ({len(names_ordered)} fitur, {len(body)} baris logika)")


if __name__ == "__main__":
    main()
