import { test, expect } from "@playwright/test";

test("refactoring of the original codegen test", async ({ page }) => {
  await page.goto("/");

  // welcome room
  await expect(page.getByRole("heading")).toContainText(
    "Welcome to the Dungeon!"
  );

  // right door room
  await page.getByRole("link", { name: "Open the right door" }).click();
  await expect(page.getByRole("heading")).toContainText("The Right Door");
  await page.getByRole("link", { name: "Return to the entrance" }).click();

  // welcome room
  await page.getByRole("link", { name: "Open the left door" }).click();

  // left door room > fight
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

  // welcome room
  await page.getByRole("link", { name: "Open the straight door" }).click();

  // straight door room > treasure
  await expect(page.getByRole("paragraph")).toContainText(
    "You find a chest filled with gold and jewels."
  );
  await page.getByRole("link", { name: "Return to the entrance" }).click();
});
