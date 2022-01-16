#include <emscripten/emscripten.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

const uint8_t *lcs(
    const uint8_t *S,
    uint32_t r,
    const uint8_t *T,
    uint32_t n,
    uint32_t *lcs_length)
{
    *lcs_length = 0;
    size_t end = 0;

    uint32_t L[2][n];
    size_t row = 0;

    for (size_t i = 0; i <= r; ++i)
    {
        for (size_t j = 0; j <= n; ++j)
        {
            if (i == 0 || j == 0)
            {
                L[row][j] = 0;
            }
            else if (S[i - 1] == T[j - 1])
            {
                L[row][j] = L[1 - row][j - 1] + 1;
                if (L[row][j] > *lcs_length)
                {
                    *lcs_length = L[row][j];
                    end = i - 1;
                }
            }
            else
            {
                L[row][j] = 0;
            }
        }
        row = 1 - row;
    }

    return S + end - *lcs_length + 1;
}

EMSCRIPTEN_KEEPALIVE
uint8_t *pog_entry(uint8_t *input, uint32_t input_len, uint32_t *output_len)
{
    uint8_t *S = input;
    uint32_t r = 0;
    uint8_t *T = S;
    while (*T != '\n')
    {
        ++T;
        ++r;
    }
    ++T;
    uint32_t n = 0;
    uint8_t *ptr = T;
    while (*ptr)
    {
        ++ptr;
        ++n;
    }

    uint32_t length;
    const uint8_t *longest_common_substring = lcs(S, r, T, n, &length);

    *output_len = length;
    return (uint8_t *)longest_common_substring;
}