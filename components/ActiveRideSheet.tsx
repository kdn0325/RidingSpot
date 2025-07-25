import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRide } from '~/providers/RideProvider';
import { Button } from './Button';

export default function ActiveRideSheet() {
  const { ride, finishRide } = useRide();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (ride) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [ride]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enableDynamicSizing
      backgroundStyle={styles.bottomSheetBackground}
      enablePanDownToClose>
      {ride && (
        <BottomSheetView style={styles.bottomSheetView}>
          <Text>현재 라이딩이 진행중입니다</Text>
          <Button title="종료" onPress={() => finishRide()} />
        </BottomSheetView>
      )}
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
});
