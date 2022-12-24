import { render, screen } from '@testing-library/react';
import data from "./data.json";

test('Each item has a unique id', () => {
  let ids = {};
  for (const i in data) {
    let id = data[i].id;
    expect(id).not.toBeUndefined();
    expect(ids).not.toContain(id);
    ids[id] = true;
  }
});

test('Each item has required fields', () => {
  let requiredFields = ["brand", "collection", "id", "type", "image", "price"];
  for (const i in data) {
    for (const j in requiredFields) {
      expect(data[i][requiredFields[j]]).not.toBeUndefined();
    }
  }
});

test('Each item has a valid type', () => {
  let validTypes = ["calendar", "chronograph", "dive", "dress", "field", "pilot", "sport", "travel"];
  for (const i in data) {
    expect(validTypes).toContain(data[i].type);
  }
});