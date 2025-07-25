import { Image, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useScooter } from '~/providers/ScooterProvider';
import pin from '~/assets/pin.png';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Button } from './Button';
import { useRide } from '~/providers/RideProvider';

export default function SelectedScooterSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedScooter, setSelectedScooter, direction, duration, distance, isNearby } =
    useScooter();

  useEffect(() => {
    if (selectedScooter) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [selectedScooter]);

  const { startRide } = useRide();

  const names = direction?.waypoints?.find((wp) => wp.name)?.name;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enableDynamicSizing
      backgroundStyle={styles.bottomSheetBackground}
      onClose={() => setSelectedScooter(undefined)}
      enablePanDownToClose>
      <BottomSheetView style={styles.bottomSheetView}>
        <View style={styles.headerRow}>
          <Image source={pin} style={styles.pinImage} />
          <View style={styles.headerTexts}>
            <Text style={styles.title}>Line - S</Text>
            <Text style={styles.subtitle}>
              id-{selectedScooter?.id} {names}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <FontAwesome6 name="clock" size={18} color="white" />
              <Text style={styles.infoText}>
                약 {duration ? (duration / 60).toFixed() : '-'} 분
              </Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome6 name="flag-checkered" size={18} color="white" />
              <Text style={styles.infoText}>
                {distance ? (distance / 1000).toFixed(1) : '-'} km
              </Text>
            </View>
          </View>
        </View>

        {/* 하단 뷰 */}
        <View>
          <Button
            title="시작"
            onPress={() => {
              selectedScooter?.id && startRide(selectedScooter.id);
              setSelectedScooter(undefined);
            }}
            disabled={!isNearby}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#414442',
  },
  bottomSheetView: {
    flex: 1,
    padding: 10,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pinImage: {
    width: 60,
    height: 70,
  },
  headerTexts: {
    flex: 1,
    gap: 5,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
  },
  infoContainer: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
  },
  infoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
