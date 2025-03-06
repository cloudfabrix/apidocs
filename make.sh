#!/bin/bash

echo "Starting API documentation build process..."

# Ensure required dependencies are installed
if ! command -v npx &> /dev/null
then
    echo "Error: npx is not installed. Install Node.js and try again."
    exit 1
fi

# Bundle OpenAPI specs into static ReDoc HTML
npx redoc-cli bundle openapi-8.0.json -o openapi-8.0-static.html
npx redoc-cli bundle openapi-3.7.2.json -o openapi-3.7.2-static.html

echo "Bundled OpenAPI specifications successfully."

# Generate index.html with the version selector and updated styles
cat > index.html <<EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation</title>
    <style>
        body {
            font-family: Helvetica, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .version-selector {
            margin-bottom: 20px;
        }
        label {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            display: inline-block;
            margin-right: 10px;
        }
        select {
            color: #333;
            background-color: #ffffff;
            font-size: 1rem;
            width: 150px;
            border: 2px solid #333;
            padding: 8px;
            border-radius: 5px;
            cursor: pointer;
        }
        #redoc-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
    </style>
    <script>
        function changeVersion() {
            const version = document.getElementById("apiVersion").value;
            const redocContainer = document.getElementById("redoc-container");
            redocContainer.innerHTML = "";
            
            let specUrl = "";
            if (version === "8.0") {
                specUrl = "./openapi-8.0.json";
            } else if (version === "3.7.2") {
                specUrl = "./openapi-3.7.2.json";
            }
            
            if (specUrl) {
                Redoc.init(specUrl, {}, redocContainer);
            } else {
                redocContainer.innerHTML = "<h2>API documentation is not available for version " + version + "</h2>";
            }
        }
    </script>
</head>
<body>
    <div class="version-selector">
        <label for="apiVersion" style="font-family: Helvetica; font-size: 1.2rem; font-weight: bold; color: #333; margin-right: 10px;">Select API Version:</label>
        <select id="apiVersion" onchange="changeVersion()">
            <option value="8.0">8.0</option>
            <option value="3.7.2">3.7.2</option>
        </select>
    </div>

    <div id="redoc-container"></div>
    <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.min.js"></script>
    <script>
        Redoc.init('./openapi-8.0.json', {}, document.getElementById('redoc-container'));
    </script>
</body>
</html>
EOL

echo "index.html generated with API version selector."

echo "Build process completed!"