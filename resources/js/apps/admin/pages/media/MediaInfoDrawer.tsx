import { Button, Drawer, type DrawerProps, Image } from '@mantine/core'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useFetcher } from 'react-router'
import dayjs from '@/packages/libs/dayjs.ts'
import type { components } from '@/types/admin'

const Info = ({
	label,
	children,
}: {
	label: string
	children: React.ReactNode
}) => (
	<p className="border-gray-3 dark:border-gray-8 flex justify-between border-b py-2">
		<span className="text-gray-6">{label}</span>
		<span>{children}</span>
	</p>
)

export default function MediaInfoDrawer({
	opened,
	onClose,
	media,
}: DrawerProps & {
	media?: components['schemas']['MediaResource']
}) {
	const { t } = useTranslation()
	const fetcher = useFetcher()

	const handleDelete = () => {
		fetcher.submit(null, { action: `${media?.id}`, method: 'DELETE' })
		onClose()
	}

	return (
		<Drawer
			opened={opened}
			onClose={onClose}
			position="right"
			classNames={{ title: 'truncate' }}
			title={media?.alt}
		>
			<Image
				src={media?.url}
				className="max-h-75 rounded"
				fit="cover"
				loading="lazy"
			/>
			<div className="mt-4 flex flex-col gap-4">
				<div>
					<h5 className="border-gray-3 dark:border-gray-8 border-b py-2">
						{t('information')}
					</h5>
					<div className="text-sm">
						<Info label={t('fields.media.filename')}>
							{media?.filename}.{media?.extension}
						</Info>
						<Info label={t('fields.media.size')}>{media?.size}</Info>
						<Info label={t('fields.media.created_at')}>
							{dayjs(media?.created_at).format('YYYY/MM/DD HH:mm:ss')}
						</Info>
						<Info label={t('fields.media.id')}>{media?.id}</Info>
						<Info label={t('fields.media.aggregate_type')}>
							{media?.aggregate_type}
						</Info>
						<Info label={t('fields.media.alt')}>{media?.alt}</Info>
					</div>
				</div>
				<div className="mt-4 flex gap-2">
					<Button
						fullWidth
						component={Link}
						to={media?.url as string}
						target="_blank"
					>
						{t('actions.view')}
					</Button>
					<Button fullWidth variant="default" onClick={handleDelete}>
						{t('actions.delete')}
					</Button>
				</div>
			</div>
		</Drawer>
	)
}
