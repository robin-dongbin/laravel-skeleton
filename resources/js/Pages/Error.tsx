import BlankLayout from '@/layouts/BlankLayout'
import { Link } from '@inertiajs/react'
import { Button, Container, Text, Title } from '@mantine/core'
import React from 'react'

const ErrorPage = ({ status }) => {
  const title = {
    503: 'Service Unavailable',
    500: 'Server Error',
    404: 'Page Not Found',
    403: 'Forbidden',
  }[status]

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[status]

  return (
    <Container className="py-20">
      <Title className="text center text-[16rem] font-bold">{status}</Title>
      <Title className="text-center">{title}</Title>
      <Text size="lg" className="mt-10 text-center">
        {description}
      </Text>
      <div className="mt-10 flex justify-center">
        <Button size="md" component={Link} href={route('admin.home')}>
          Take me back to home page
        </Button>
      </div>
    </Container>
  )
}

ErrorPage.layout = (page: React.ReactNode) => <BlankLayout children={page} />

export default ErrorPage
