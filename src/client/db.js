const db = new PouchDB('fittrac');

async function loadUsername() {
    try {
        const response = await db.allDocs({
            include_docs: true,
            descending: true,
            limit: 1
        });

        if (response.rows.length > 0) {
            const userData = response.rows[0].doc;
            const username = userData.username;

    
            document.getElementById('welcome').innerText = `Hello, ${username}!`;
        } else {
            console.warn('No user data found in PouchDB.');
        }
    } catch (error) {
        console.error('Error loading user data from PouchDB:', error);
    }
}

loadUsername();