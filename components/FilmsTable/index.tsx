import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import * as SQLite from 'expo-sqlite';
import { ListItem } from 'react-native-elements';
const db = SQLite.openDatabase('films.db'); // returns Database object

const films = [
    {
        title: "7 días en La Habana",
        description: "Un retrato de la capital cubana en siete capítulos dirigidos por siete directores aclamados internacionalmente. Cada capítulo muestra un día de la semana a partir de las historias de sus protagonistas, que están relacionadas entre ellas."
    },
    {
        title: "Conducta",
        description: "Chala desarrolla un fuerte vínculo con su maestra, y luchan juntos contra el sistema cuando su nueva profesora quiere enviarlo a un centro de reeducación."
    },
    {
        title: "Fresa y Chocolate",
        description: "Un idealista comunista ve cómo su opinión de la vida cambia cuando hace amistad con un homosexual cubano."
    },
    {
        title: "La Bella del Alhambra",
        description: "Una joven y ambiciosa bailarina (Beatriz Valdes) llega a la cima del circuito de cabarets cubanos en los años 1920 y 1930."
    },
    {
        title: "Vampiros en La Habana",
        description: "El hijo de Drácula desafía a la mafia de Chicago que busca la poción que permite a los vampiros soportar la luz del día."
    },
];

class FilmTable extends React.Component<{}, {data: Array<{[column: string]: any}>}> {
    constructor(props: {}) {
      super(props)
      this.state = {
        data: []
      };
      // Check if the items table exists if not create it
      db.transaction(tx => {
        tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Film'", undefined,
            (tx, resultSet) => {
                if (resultSet.rows.length === 0) {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS Film (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)'
                      );
              
                    films.forEach(film => {
                        tx.executeSql(
                            'INSERT INTO Film (title, description) VALUES (?, ?)', [film.title, film.description]
                        );    
                    });
                }
            }
        );
      });

      this.fetchData() // ignore it for now
    }

    fetchData(){
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Film', undefined, (tx, resultSet) => {
                let rows = resultSet.rows;
                let data: Array<{}> = [];
                for (var i = 0; i < rows.length; i++) {
                    data.push(rows.item(i));
                }
                this.setState({data: data})
            });
        });
    }

    render() {
      return (
          <View style={Style.main}>
          <Text style={{fontSize: 20, fontWeight: "bold", margin: 16}}>List of Movies</Text>
          
          <FlatList data={this.state.data} 
              keyExtractor={(item, index) => item.id} 
              renderItem={({item}) => (
              <ListItem bottomDivider>
                  <ListItem.Content>
                      <ListItem.Title style={{color: "#454545", marginBottom: 8, fontSize: 20}}>{item.title}</ListItem.Title>
                      <ListItem.Subtitle style={{color: "#454545"}}>{item.description}</ListItem.Subtitle>
                  </ListItem.Content>
              </ListItem>
          )} />
        </View >
      )
    }
}

const Style = StyleSheet.create({
    main: {}
});

export default FilmTable
// Styles are removed purpose-fully 