import React, {useEffect} from 'react';

import {Text, View, PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';
import RNFetchBlob from 'rn-fetch-blob';

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

  async function onDBConection() {
    let dirs = RNFetchBlob.fs.dirs.DownloadDir;
    console.log(dirs + '/www');
    await RNFetchBlob.fs.exists(dirs + '/www').then(exist => {
      console.log(`file ${exist ? '' : 'not'} exists`);
      if (!exist) {
        try {
          const fs = RNFetchBlob.fs;

          RNFetchBlob.fs.mkdir(dirs + '/www').then(() => {
            console.log('sucess');
          });
        } catch (e) {
          console.log('error');
        }
      }
    });
    // const path = `${RNFS.DownloadDirectoryPath}/pasta_teste`;

    // console.log(path);

    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   {
    //     title: 'Grant SD card access',
    //     message: 'We need access',
    //   },
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('Permission OK');
    // } else {
    //   console.log('Permission failed');
    // }
    // if (await RNFS.mkdir(path)) {
    //   console.log('Directory created');
    // } else {
    //   console.warn('Could not create');
    // }

    // RNFS.mkdir(path)
    //   .then(result => {
    //     console.log('result', result);
    //   })
    //   .catch(err => {
    //     console.warn('err', err);
    //   });

    const db = SQLite.openDatabase(
      {
        name: 'dbteste',
        location: 'Download',
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
