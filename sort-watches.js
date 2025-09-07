#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function main() {
    const args = process.argv.slice(2);
    
    if (args.length !== 2) {
        console.error('Usage: node sort-watches.js <json-file> <field-name>');
        process.exit(1);
    }
    
    const [filename, fieldName] = args;
    
    if (!fs.existsSync(filename)) {
        console.error(`Error: File '${filename}' not found`);
        process.exit(1);
    }
    
    try {
        const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
        
        if (!data.watches || !Array.isArray(data.watches)) {
            console.error('Error: JSON file must contain a "watches" array');
            process.exit(1);
        }
        
        data.watches.sort((a, b) => {
            const aVal = a[fieldName];
            const bVal = b[fieldName];
            
            if (aVal === undefined || bVal === undefined) {
                console.error(`Error: Field '${fieldName}' not found in all watch objects`);
                process.exit(1);
            }
            
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal);
            }
            
            if (aVal < bVal) return -1;
            if (aVal > bVal) return 1;
            return 0;
        });
        
        console.log(JSON.stringify(data, null, 2));
        
    } catch (error) {
        console.error(`Error parsing JSON file: ${error.message}`);
        process.exit(1);
    }
}

main();