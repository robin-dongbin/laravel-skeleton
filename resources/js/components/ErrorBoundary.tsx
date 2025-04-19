import { Button, Container, Group, Text, Title } from '@mantine/core'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

export default function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <Container className="py-20">
        <Title className="text-center text-[200px]">{error.status}</Title>
        <Title className="text-center">{error.statusText}</Title>
        <Text c="dimmed" size="lg" ta="center" className="mt-10">
          {error.data}
        </Text>
        <Group justify="center" className="mt-10">
          <Button variant="subtle" size="md" component={Link} to="/">
            Take me back to home page
          </Button>
        </Group>
      </Container>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}
