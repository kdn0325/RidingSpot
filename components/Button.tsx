import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, disabled, style, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        disabled={disabled}
        style={[styles.button, style, disabled && styles.buttonDisabledBackground]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#38C400',
    borderRadius: 24,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabledBackground: {
    backgroundColor: '#A0A0A0',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
