import sqlite3 from 'sqlite3';

class AppDAO {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.error('Could not connect to database', err);
            } else {
                console.log('Connected to database');
            }
        });
    }
}

export default AppDAO;