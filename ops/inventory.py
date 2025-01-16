import csv
import json

def updateInventoryCsv(json_file, csv_file):
    # Define categories
    categories = ["Genre", "Setting", "Theme", "TensionLevel", "Length", "Tone"]
    category_values = {category: [] for category in categories}

    # Read JSON data from file
    with open(json_file, 'r') as file:
        json_data = json.load(file)

    # Populate category values from JSON
    for item in json_data:
        if item["type"] in categories:
            name_entry = item["name"]
            if "is_default" in item and item["is_default"]:
                name_entry = "Default_" + name_entry
            category_values[item["type"]].append(name_entry)

    # Ensure all rows have the same number of columns
    max_columns = max(len(values) for values in category_values.values())
    for values in category_values.values():
        while len(values) < max_columns:
            values.append("")

    # Write to CSV
    with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)

        # Write headers
        writer.writerow(categories)

        # Write values as columns
        for i in range(max_columns):
            row = [category_values[category][i] if i < len(category_values[category]) else "" for category in categories]
            writer.writerow(row)

# Example usage
if __name__ == "__main__":
    # Input JSON file
    input_json = "items.json"

    # Output CSV file
    output_csv = "result.csv"

    # Write JSON data to CSV
    updateInventoryCsv(input_json, output_csv)
    print(f"Data has been written to {output_csv}")
