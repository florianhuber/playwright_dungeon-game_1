import { test, expect } from "@playwright/test";

test("simple test, generated with codegen", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByRole("heading")).toContainText(
    "Welcome to the Dungeon!"
  );
  await page.getByRole("link", { name: "Open the right door" }).click();
  await expect(page.getByRole("heading")).toContainText("The Right Door");
  await page.getByRole("link", { name: "Return to the entrance" }).click();
  await page.getByRole("link", { name: "Open the left door" }).click();
  await expect(
    page.getByRole("link", { name: "Fight the goblin" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Run back to the entrance" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Fight the goblin" }).click();
  await expect(page.getByRole("button", { name: "Roll Dice" })).toBeVisible();
  await page.getByRole("button", { name: "Roll Dice" }).click();
  await expect(page.getByText("You rolled a 4. You defeated")).toBeVisible();
  await expect(page.locator("#result")).toContainText("You rolled");
  await page.getByRole("link", { name: "Return to the entrance" }).click();
  await page.getByRole("link", { name: "Open the straight door" }).click();
  await expect(page.getByRole("paragraph")).toContainText(
    "You find a chest filled with gold and jewels."
  );
  await page.getByRole("link", { name: "Return to the entrance" }).click();
});
