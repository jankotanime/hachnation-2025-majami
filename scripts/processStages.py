import ast
import pandas as pd
import re

file_path = "./stages.txt"
stages: dict[int, list[dict]] = {}
output_path = "./stages.csv"
stage_types = set()

with open(file_path, "r", encoding="utf-8") as file:
    lines = file.readlines()
    index = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if line.startswith("-"):
            # Header line: "---------termX----------"
            match = re.search(r"\d+", line)
            index = int(match.group(0)) if match else None
            if index is not None and index not in stages:
                stages[index] = []
            continue

        if line.startswith("{") and index is not None:
            try:
                stages_dict = ast.literal_eval(line)
                if 'stageType' in ast.literal_eval(line):
                    stage_types.add(ast.literal_eval(line)['stageType'])
            except (SyntaxError, ValueError):
                continue

            stages[index].append(stages_dict)


rows = []
for term, items in stages.items():
    for item in items:
        row = {"term": term, **item}
        rows.append(row)

df = pd.DataFrame(rows)

df = df.astype(object).where(pd.notnull(df), None)
ordered_cols = ["term"] + [c for c in df.columns if c != "term"]
df = df[ordered_cols]

df.to_csv(output_path, sep="$", index=False, encoding="utf-8")
print(df.head())
print(stage_types)