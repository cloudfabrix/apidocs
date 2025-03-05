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

# Generate index.html with the version selector
cat > index.html <<EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation</title>
    <script>
        function changeVersion() {
            const version = document.getElementById("apiVersion").value;
            const redocContainer = document.getElementById("redoc-container");
            redocContainer.innerHTML = "";
            
            let specUrl = "";
            if (version === "8.0") {
                specUrl = "openapi-8.0-static.html";
            } else if (version === "3.7.2") {
                specUrl = "openapi-3.7.2-static.html";
            } 
            
            if (specUrl) {
                fetch(specUrl)
                    .then(response => response.text())
                    .then(html => {
                        redocContainer.innerHTML = html;
                    })
                    .catch(error => {
                        redocContainer.innerHTML = "<h2>Failed to load API documentation for version " + version + "</h2>";
                    });
            } else {
                redocContainer.innerHTML = "<h2>API documentation is not available for version " + version + "</h2>";
            }
        }
    </script>
</head>
<body>
    <div class="version-selector">
        <label for="apiVersion" style="font-family: Helvetica; color: #333333; font-size: 1rem;">Select API Version:</label>
        <select id="apiVersion" style="color: #333333; font-family: Helvetica; font-size: 1rem; width: 100px; border: 1px solid #333333; margin-left: 10px;" onchange="changeVersion()">
            <option value="8.0">8.0</option>
            <option value="3.7.2">3.7.2</option>
        </select>
    </div>

    <div id="redoc-container">
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                changeVersion();
            });
        </script>
    </div>
</body>
</html>
EOL

echo "index.html generated with API version selector."

echo "Build process completed!"
