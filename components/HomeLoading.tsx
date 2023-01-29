import { Skeleton, Stack, Box } from '@mui/material'
import React from 'react'

export default function HomeLoading() {
    return (
        <Stack spacing={1}>
            <Box display='flex' alignItems='center' sx={{ columnGap: 1 }}>
                <Stack spacing={1}>
                    <Skeleton animation='wave' variant="rounded" width={210} height={48} />
                    <Skeleton animation='wave' variant="rounded" width={210} height={36} />
                </Stack>
                <Skeleton animation='wave' variant="rounded" width={110} height={45} />
                <Skeleton animation='wave' variant="rounded" width={60} height={45} />
            </Box>
            <Skeleton animation='wave' variant="rounded" width={569} height={100} />
        </Stack>
    )
}