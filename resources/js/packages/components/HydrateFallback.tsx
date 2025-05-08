import { Center, Loader, Stack, Text } from '@mantine/core'

export default function HydrateFallback() {
  return (
    <Center mih="100vh">
      <Stack align="center">
        <Loader size="md" />
        <Text>Loading...</Text>
      </Stack>
    </Center>
  )
}
