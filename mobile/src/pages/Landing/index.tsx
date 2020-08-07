import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useNavigation, NavigationHelpersContext } from '@react-navigation/native';
import api from '../../services/api';
export default function Landing(){  

    const [connections, setConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setConnections(total);
        })
    }, [])
    const navigation = useNavigation();
    
    function handleNavigateToGiveClassesPage(){
        navigation.navigate('GiveClasses');
    }
    function handleNavigateToStudyPage(){
        navigation.navigate('Study');
    }
    return (
    <View style={styles.container}>
        <Image source={landingImg} style={styles.banner} />

        <Text style={styles.title}>
            Seja bem-vindo, {'\n'}
            <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>
        <View style={styles.buttonsContainer}>
            <RectButton 
                style={[styles.button, styles.buttonPrimary]}
                onPress={handleNavigateToStudyPage}>
                <Image source={studyIcon}  />

                <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>
            <RectButton 
                onPress={handleNavigateToGiveClassesPage} 
                style={[styles.button, styles.buttonSecundary]}
            >
                <Image source={giveClassesIcon}  />

                <Text style={styles.buttonText}>Dar aulas</Text>
            </RectButton>
        </View>
        <Text style={styles.totalConnections}>
            Total de {connections} conexões já realizadas{' '} 
            <Image source={heartIcon} />
        </Text>
    </View>
    )
}
