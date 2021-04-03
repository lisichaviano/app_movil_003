import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import {TabView, SceneMap } from 'react-native-tab-view';
import Calculator from './components/Calculator';
import FilmTable from './components/FilmsTable';

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'calculator', title: 'Calculator' },
    { key: 'table', title: 'Table' },
  ]);

  const renderScene = SceneMap({
    calculator: Calculator,
    table: FilmTable,
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 320 }}
        />
    </SafeAreaView>
  );
}