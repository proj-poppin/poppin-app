import React from 'react';
import {Text, StyleSheet} from 'react-native';

const RequiredTextLabel = ({label, isRequired = false}) => {
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
