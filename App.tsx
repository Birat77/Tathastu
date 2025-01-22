import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import {
  sampleData,
  // bigSampleData
} from './src/data';
import {
  // OldComponent,
  NewComponent,
} from './src/components';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<OldComponent data={sampleData}/>*/}
      <NewComponent data={sampleData} />
    </SafeAreaView>
  );
}

export default App;
