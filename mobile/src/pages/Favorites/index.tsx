import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

export default function Favorites(){

    const [isFiltersVisible, setIsFilterVisible] = useState(false);

    const [favorites, setFavorites] = useState([]);
    
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    function handleFiltersSubmit(){
        console.log(subject,week_day,time);
    }
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    return (
        <View style={styles.container}>
            <PageHeader 
            title={'Meus Proffys Favoritos'} />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
            {favorites.map((teacher: Teacher) => {
                return <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited 
                        />
            })}
            
        </ScrollView>
    </View>
    )
}
