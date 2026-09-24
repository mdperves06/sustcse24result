import json

with open("data/processed/students.json", "r", encoding="utf-8") as f:
    students = json.load(f)

for s in students:
    if s["regNo"] == "2023331005":
        print("Student 2023331005 record:")
        print(json.dumps(s, indent=2))
        assert s["totalCompletedCredits"] == 34.50, f"Expected 34.50, got {s['totalCompletedCredits']}"
        assert s["sem1Credit"] == 16.50
        assert s["sem2Credit"] == 10.50
        print("Student 2023331005 assertion passed!")
        break
