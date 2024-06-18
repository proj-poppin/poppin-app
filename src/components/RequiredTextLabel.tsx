import React from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  isRequired?:boolean
}

const RequiredTextLabel = ({label, isRequired = false}:Props) => {
  return (
    <Text style={styles.labelText}>
      {label}
      {isRequired && <Text style={styles.requiredAsterisk}>*</Text>}
    </Text>
  );
};

const styles = StyleSheet.create({
  labelText: {
    paddingVertical: 5,
  },
  requiredAsterisk: {
    color: 'red',
  },
});

export default RequiredTextLabel;
