import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
// import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';

const Main = () => {
  useEffect(() => {
    onDBConection();
  }, []);

  function errorCB(err) {
    console.log('SQL Error: ' + err);
  }

  function successCB() {
    console.log('SQL executed fine');
  }

  function openCB() {
    console.log('Database OPENED');
  }

  function onDBConection() {
    // const path = RNFS.DownloadDirectoryPath;
    // console.log(path);
    const db = SQLite.openDatabase(
      {
        name: 'dbteste',
        location: 'Documents',
        createFromLocation: '~www/dbteste',
      },
      successCB,
      errorCB,
    );

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM test', [], (tx, results) => {
        console.log('Query completed');

        // Get rows with Web SQL Database spec compliance.

        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log(`Employee name: ${row.x}, Dept Name: ${row.y}`);
        }

        // Alternatively, you can use the non-standard raw method.

        /*
            let rows = results.rows.raw(); // shallow copy of rows Array

            rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
          */
      });
    });
  }

  return (
    <View>
      <Text>teste sqllite</Text>
    </View>
  );
};

export default Main;
