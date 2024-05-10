import replicate

input = {
    "prompt": "a close up corner room white walls with big windows",
    "num_outputs": 4
}

output = replicate.run(
    "thijssdaniels/room-gpt:bfcb42751f8f702e4661daa3e592c960cdec178831df79d361c54a78e8ec87e1",
    input=input
)
print(output)