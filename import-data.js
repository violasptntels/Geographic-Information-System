const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import Location model
const Location = require('./server/models/Location');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gis_database';

async function importData() {
    try {
        // Connect to MongoDB
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully\n');

        // Read JSON file
        const filePath = path.join(__dirname, 'data', 'sample-locations.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const locations = JSON.parse(jsonData);

        console.log(`📦 Found ${locations.length} locations to import\n`);

        // Clear existing data (optional)
        const deleteResult = await Location.deleteMany({});
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing records\n`);

        // Insert new data
        console.log('📥 Importing data...');
        const result = await Location.insertMany(locations);
        
        console.log(`✅ Successfully imported ${result.length} locations!\n`);

        // Display imported locations
        console.log('📍 Imported Locations:');
        result.forEach((loc, index) => {
            console.log(`   ${index + 1}. ${loc.name} (${loc.category})`);
        });

        console.log('\n🎉 Data import completed successfully!');
        
    } catch (error) {
        console.error('❌ Error importing data:', error);
    } finally {
        // Close connection
        await mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
        process.exit(0);
    }
}

// Run import
importData();
