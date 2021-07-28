import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    if (goalTitle.length === 0) {
      return;
    }
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { key: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.key !== goalId);
    });
  };

  const cancelGoalAdding = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onCancel={cancelGoalAdding}
        visible={isAddMode}
        onAddGoal={addGoalHandler}
      />
      <FlatList
        data={courseGoals}
        keyExtractor={(item, index) => item.key}
        renderItem={(itemdata) => (
          <GoalItem
            onDelete={removeGoalHandler.bind(this, itemdata.item.key)}
            title={itemdata.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 70,
    padding: 30,
  },
});
