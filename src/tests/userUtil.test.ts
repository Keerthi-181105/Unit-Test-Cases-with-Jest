import { describe, expect, test } from "@jest/globals";
import {
  getUserFullName,
  isValidEmail,
  getActiveUsers,
  getUserById
} from "../userUtil";
import type { User } from "../userUtil";

describe("User Utility Tests", () => {
  test("should format user full name to uppercase", () => {
    const result = getUserFullName("john doe");
    expect(result).toBe("JOHN DOE");
  });

  test("should trim whitespace when formatting a user full name", () => {
    expect(getUserFullName("  Jane Doe  ")).toBe("JANE DOE");
  });

  describe("isValidEmail", () => {
    test("should accept an email containing an at sign and a period", () => {
      expect(isValidEmail("alice@test.com")).toBe(true);
    });

    test("should reject an email without an at sign", () => {
      expect(isValidEmail("alicetest.com")).toBe(false);
    });

    test("should reject an email without a period", () => {
      expect(isValidEmail("alice@testcom")).toBe(false);
    });

    test("should reject an empty email", () => {
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("getActiveUsers", () => {
    const users: User[] = [
      { id: 1, name: "Alice", email: "alice@test.com", isActive: true },
      { id: 2, name: "Bob", email: "bob@test.com", isActive: false },
      { id: 3, name: "Charlie", email: "charlie@test.com", isActive: true }
    ];

    test("should return only active users in their original order", () => {
      const activeUsers = getActiveUsers(users);

      expect(activeUsers).toEqual([users[0], users[2]]);
      expect(activeUsers).toContain(users[0]);
    });

    test("should return an empty array when the input is empty", () => {
      expect(getActiveUsers([])).toEqual([]);
    });

    test("should return an empty array when no users are active", () => {
      const inactiveUsers = users.filter(user => !user.isActive);
      expect(getActiveUsers(inactiveUsers)).toEqual([]);
    });
  });

  describe("getUserById", () => {
    const users: User[] = [
      { id: 1, name: "Alice", email: "alice@test.com", isActive: true },
      { id: 2, name: "Bob", email: "bob@test.com", isActive: false },
      { id: 3, name: "Charlie", email: "charlie@test.com", isActive: true }
    ];

    test("should return the user matching the requested ID", () => {
      expect(getUserById(users, 2)).toEqual(users[1]);
    });

    test("should return undefined when the ID is not found", () => {
      expect(getUserById(users, 99)).toBeUndefined();
    });

    test("should return undefined for an empty user list", () => {
      expect(getUserById([], 1)).toBeUndefined();
    });

    test("should return undefined for a negative ID", () => {
      expect(getUserById(users, -1)).toBeUndefined();
    });
  });
});
