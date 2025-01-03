import { test, expect, Locator } from "@playwright/test";

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
  // decide to fight
  await page.getByRole("link", { name: "Fight the goblin" }).click();

  // Roll dice button appears
  const diceButton = page.getByRole("button", { name: "Roll Dice" });
  await expect(diceButton).toBeVisible();
  const diceResultLocator = page.locator("#result");
  // Roll dice action testing
  await testDiceRoll(diceResultLocator, diceButton);

  await page.getByRole("link", { name: "Return to the entrance" }).click();

  // welcome room
  await page.getByRole("link", { name: "Open the straight door" }).click();

  // straight door room > treasure
  await expect(page.getByRole("paragraph")).toContainText(
    "You find a chest filled with gold and jewels."
  );
  await page.getByRole("link", { name: "Return to the entrance" }).click();
});

// Utility method for testing dice roll outcomes
async function testDiceRoll(diceResultLocator: Locator, diceButton: Locator) {
  // Click the "Roll Dice" button
  await diceButton.click();

  const diceResultPattern = /You rolled a \d\./; // Regex to match "You rolled X."

  // Validate the dice roll result
  await expect(diceResultLocator).toContainText(diceResultPattern);

  const resultText = await diceResultLocator.textContent();
  console.log("Dice roll result:", resultText);
}
