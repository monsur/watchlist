import { render, screen } from '@testing-library/react';
import data from "../public/data.json";

test('Each item has a unique id', () => {
  let ids = {};
  for (const i in data.watches) {
    let id = data.watches[i].id;
    expect(id).not.toBeUndefined();
    expect(ids).not.toHaveProperty(id);
    ids[id] = true;
  }
});

test('Each item has required fields', () => {
  let requiredFields = ["brand", "collection", "id", "type", "image", "price"];
  for (const i in data.watches) {
    for (const j in requiredFields) {
      expect(data.watches[i][requiredFields[j]]).not.toBeUndefined();
    }
  }
});

test('Each item has a valid type', () => {
  let validTypes = ["calendar", "chronograph", "dive", "dress", "field", "pilot", "sport", "travel"];
  for (const i in data.watches) {
    expect(validTypes).toContain(data.watches[i].type);
  }
});

test('Each item has a valid rank', () => {
  let ranks = {};
  for (const i in data.watches) {
    let item = data.watches[i];
    if (item.hasOwnProperty("rank")) {
      let rank = item.rank;
      expect(rank).toBeGreaterThan(0);
      expect(ranks).not.toHaveProperty(rank.toString());
      ranks[rank.toString()] = true;
    }
  }
});