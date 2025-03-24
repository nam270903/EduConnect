import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as ExcelJS from 'exceljs';
import RNFS from 'react-native-fs';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../../FirebaseConfig';
import { ExportSquare, ImportSquare, ProfileAdd, ProfileRemove } from 'iconsax-react-native';
import { ref, set } from 'firebase/database';

interface ExcelDataRow {
  column1: string;
  column2: string;
  column3: string;
  isPresent: boolean;
  isLate: boolean;
  isAbsent: boolean;
}

const Attendance = () => {
  const navigation = useNavigation<any>();

  const auth = FIREBASE_AUTH;
  const database = FIREBASE_DATABASE;

  const [data, setData] = useState<ExcelDataRow[]>([]);

  const FilePicker = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });
      const fileUri = results[0].uri;

      // Read the file as base64
      const base64 = await RNFS.readFile(fileUri, 'base64');

      // Load base64 data into ExcelJS
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(Buffer.from(base64, 'base64'));

      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        console.error('Worksheet not found');
        return;
      }

      const dataArray: ExcelDataRow[] = [];

      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return 0;
        const rowValues = row.values as (ExcelJS.CellValue | null)[];
        const column1 = rowValues[1] ? rowValues[1].toString() : '';
        const column2 = rowValues[2] ? rowValues[2].toString() : '';
        const column3 = rowValues[3] ? rowValues[3].toString() : '';

        dataArray.push({ column1, column2, column3, isPresent: false, isLate: false, isAbsent: false });
      });

      setData(dataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAttendance = (index: number, status: 'isPresent' | 'isLate' | 'isAbsent') => {
    const updatedData = data.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          isPresent: status === 'isPresent',
          isLate: status === 'isLate',
          isAbsent: status === 'isAbsent',
        };
      }
      return item;
    });
    setData(updatedData);
  };
  
  const Save = async () => {
    try {
      const attendanceRef = ref(FIREBASE_DATABASE, 'attendance');
      await set(attendanceRef, data);
      Alert.alert('Attendance saved successfully.');
    } catch (error) {
      console.error(error);
      Alert.alert( 'Failed to save attendance.');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.topmenu}> 

        <TouchableOpacity style={styles.date}>
          <Text>01/08/2024</Text>
        </TouchableOpacity>

        <View style={styles.menubutton}> 
          <TouchableOpacity onPress={FilePicker}>
            <ImportSquare/>
          </TouchableOpacity>

          <TouchableOpacity>
            <ProfileAdd/>
          </TouchableOpacity>

          <TouchableOpacity>
            <ProfileRemove/>
          </TouchableOpacity>

          <TouchableOpacity>
            <ExportSquare/>
          </TouchableOpacity>
        </View>
        
      </View>

      <FlatList
        data={data}
        renderItem={({ item, index }) => (

          <View style={styles.studentslist}>

            <View style={styles.info}>
              <Text style={styles.columnText}>{item.column1}</Text>
              <Text style={styles.columnText}>{item.column2}</Text>
              <Text style={styles.columnText}>{item.column3}</Text>
            </View>

            <View style={styles.attendance}>
              <TouchableOpacity
                style={item.isPresent ? styles.chosenButton : styles.defaultButton}
                onPress={() => handleAttendance(index, 'isPresent')}>
                <Text style={item.isPresent ? styles.chosenText : styles.defaultText}>Present</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={item.isLate ? styles.chosenButton : styles.defaultButton}
                onPress={() => handleAttendance(index, 'isLate')}>
                <Text style={item.isLate ? styles.chosenText : styles.defaultText}>Late</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={item.isAbsent ? styles.chosenButton : styles.defaultButton}
                onPress={() => handleAttendance(index, 'isAbsent')}>
                <Text style={item.isAbsent ? styles.chosenText : styles.defaultText}>Absent</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.saveButton}>
        <TouchableOpacity onPress={Save}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal:10,
  },

  studentslist:{
    padding:10,
    fontSize:15,
    borderBottomWidth:1,
    borderBottomColor:'#000000'
  },

  columnText:{
    paddingHorizontal: 3, 
    fontSize: 15,
  },

  info:{
    flexDirection: 'row',
  },

  attendance:{
    flexDirection: 'row',
    justifyContent:'space-evenly'
  },

  chosenButton:{
    backgroundColor:'#0080FF',
    borderRadius:13,
    height: 50,
    borderWidth:1,
    justifyContent:'center',
    padding: 10,
},

defaultButton:{
  backgroundColor:'#ffffff',
  borderRadius:13,
  height: 50,
  borderWidth:1,
  justifyContent:'center',
  padding: 10,
},

chosenText:{
  color:'#ffffff',
  fontWeight:'bold'
},

defaultText:{
  color:'#000000'
},

topmenu: {
  alignItems: 'center',
  justifyContent: 'center', 
  borderWidth: 1,
  borderRadius: 13,
  width: '100%',
  paddingVertical:10     
},

menubutton: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%', 
  borderTopWidth:1,         
  paddingHorizontal: 30,
  paddingVertical:8,
},

date:{
  paddingBottom:10
},

save:{
  color: '#ffffff',
  textAlign: 'center',
  fontSize: 17,
  fontWeight:'bold'
},

saveButton:{
    height: 50,
    padding: 15,
    backgroundColor:'#0080FF',
    borderRadius:13,
    marginHorizontal: 10,
    paddingTop:10,
},
});

export default Attendance;