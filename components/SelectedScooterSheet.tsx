import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useScooter } from '~/providers/ScooterProvider';

export default function SelectedScooterSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedScooter } = useScooter();

  useEffect(() => {
    if (selectedScooter) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedScooter]);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enableDynamicSizing
      enablePanDownToClose>
      <BottomSheetView style={{ flex: 1 }}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
