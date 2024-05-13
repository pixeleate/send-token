# Send Token

## Live https://send-token-swart.vercel.app/

As I mentioned earlier, I'm not a Web3 expert and I have only played around with some of the tooling, that being said, the project was built as follows:

### Technologies used

- React
- TypeScript
- Next.js
- Tailwind
- Zod (For data typing and form validation )
- React Hook Form (For interacting with forms)
- Wagmi
- Viem
- Shadcn UI (To quickly prototype the UI, some customization was done)
- React Testing Library
- Vitest
- Bun (Package manager only, it is faster than others)

## Caveats

- When I was trying to see the USDC balance only the AVAX balance were showing up, maybe I didn't configure something correctly, the balance was in my wallet but not when using `wagmi`, so I based the project on using AVAX, I need to look into this further.
- I was trying to calculate the total (gas + amount to send) of the transaction to show an error to the user when the balance were insuficient, however, I couldn't, I was able to get the gas price using `wagmi` but seems other calculations or fees where missing (I should read more about this)

## Approach

The app counts with only 2 main elements the `Wallet` componet which allows the user connect and disconnect their Crypto Wallet, I use MetaMask so I used the `injected` connector.

Initially the user will see the `Send Token` form with 2 options to connect their wallet, a button direction on the form and another button in the top right of the page, once the user has connected their form, the state of the main button should change to `Send`, that is the active state, clicking on the button will trigger the `form validation` providing feedback to the user on what is missing, either balance or a valid address.

When the user connects their walllet, the user will be able to see the current balance and if a bigger amount is entered in the field, an error will be prompt.

If all the element are correct the user will be able to complete the transaction getting feedback all the time by seeing the hash and confirmation of the transaction.

## Testing

The app is setup to run tests using the tooling above, however, I was not able to get them working, the `wagmi` documentation for testing is not really good, so I didn't have time to research more to make them work.

# Conclusion

The project works, and does everything that was in the requirements, only the testing part is not working, I found many github issues with similar problems due to missing docs after the v2 release of `wagmi`.
