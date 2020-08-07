import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView} from 'react-native';
import {Feather} from '@expo/vector-icons';
import styles from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export default function TeacherList(){

    const [isFiltersVisible, setIsFilterVisible] = useState(false);

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                }) 
                setFavorites(favoritedTeachersIds);
            }
        });
    }
    async function handleFiltersSubmit(){
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setIsFilterVisible(false);
        setTeachers(response.data);
    }
    return (
    <View style={styles.container}>
        <PageHeader 
            title={'Proffys disponíveis'} 
            headerRight={(
                <BorderlessButton
                    onPress={() => {setIsFilterVisible(!isFiltersVisible)}}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}
        >
        { isFiltersVisible && (
            <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={(newText) => {setSubject(newText)}}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    onChangeText={(newText) => {setWeek_day(newText)}}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o horário"
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={(newText) => {setTime(newText)}}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
        )}
        </PageHeader>
        
        <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24,
            }}
        >
            {teachers.map((teacher: Teacher) => {
                return <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
            })}
        </ScrollView>
    </View>
    )
}
