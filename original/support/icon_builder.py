import cv2
import numpy as np

icon = np.empty((128,128,3), dtype=np.int8)

red = np.flip(np.array((236, 74, 74)))
green = np.flip(np.array((104, 229, 88)))

for x in range(icon.shape[0]):
    for y in range(icon.shape[1]):
        if (y > icon.shape[0] / 2):
            icon[x,y] = red
        else:
            icon[x,y] = green

cv2.imwrite(f'images/icon_{icon.shape[0]}.png', icon)

icon48 = cv2.resize(icon, (48, 48), interpolation = cv2.INTER_LINEAR_EXACT)
cv2.imwrite(f'images/icon_{icon48.shape[0]}.png', icon48)

icon32 = cv2.resize(icon, (32, 32), interpolation = cv2.INTER_LINEAR_EXACT)
cv2.imwrite(f'images/icon_{icon32.shape[0]}.png', icon32)

icon16 = cv2.resize(icon, (16, 16), interpolation = cv2.INTER_LINEAR_EXACT)
cv2.imwrite(f'images/icon_{icon16.shape[0]}.png', icon16)