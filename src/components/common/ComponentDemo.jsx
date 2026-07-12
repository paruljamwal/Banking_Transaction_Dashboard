import { useState } from 'react'
import { FiInbox, FiPlus, FiSearch } from 'react-icons/fi'
import {
  Button,
  Input,
  Select,
  Badge,
  Card,
  Table,
  Pagination,
  Modal,
  Loader,
  EmptyState,
  SearchBar,
  StatsCard,
  ConfirmationDialog,
} from '@components/common'

const DEMO_OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

const DEMO_ROWS = [
  { id: 1, name: 'Item One', status: 'Active' },
  { id: 2, name: 'Item Two', status: 'Pending' },
  { id: 3, name: 'Item Three', status: 'Inactive' },
]

/**
 * Standalone demo for validating common components.
 * Not integrated into app routes — import manually when needed.
 */
function ComponentDemo() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectValue, setSelectValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-text">Component Library Demo</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Validation playground for reusable common components.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Items" value="1,248" change="+8.2%" trend="up" />
        <StatsCard title="Active" value="892" change="-2.1%" trend="down" />
        <StatsCard title="Pending" value="156" trend="neutral" />
        <StatsCard title="Loading" value="—" loading />
      </div>

      <Card>
        <Card.Header>
          <Card.Title>Form Controls</Card.Title>
          <Card.Description>Input, select, and search components</Card.Description>
        </Card.Header>
        <Card.Body className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Name" placeholder="Enter name" hint="Helper text example" />
          <Select
            label="Category"
            options={DEMO_OPTIONS}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            placeholder="Choose option"
          />
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="md:col-span-2"
          />
        </Card.Body>
        <Card.Footer bordered>
          <div className="flex flex-wrap gap-2">
            <Button leftIcon={<FiPlus className="h-4 w-4" />}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Danger
            </Button>
            <Button loading>Loading</Button>
          </div>
        </Card.Footer>
      </Card>

      <Card padding="none">
        <div className="border-b border-border px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge dot>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        <Table caption="Sample data table">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {DEMO_ROWS.map((row) => (
              <Table.Row key={row.id} clickable>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>
                  <Badge variant="primary">{row.status}</Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="border-t border-border p-4">
          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <Card.Title>Loader</Card.Title>
          <div className="mt-4 flex items-center gap-6">
            <Loader size="sm" showLabel={false} />
            <Loader size="md" />
            <Loader size="lg" label="Processing" />
          </div>
        </Card>

        <Card>
          <EmptyState
            icon={<FiInbox className="h-6 w-6" />}
            title="No items found"
            description="Try adjusting your search or filters."
            action={
              <Button variant="outline" leftIcon={<FiSearch className="h-4 w-4" />}>
                Clear filters
              </Button>
            }
          />
        </Card>
      </div>

      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Example Modal"
        description="Generic modal for any content."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Save</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          Place any content here. This modal is fully accessible with focus trap
          and escape key support.
        </p>
      </Modal>

      <ConfirmationDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="Delete item?"
        message="This action cannot be undone. The item will be permanently removed."
        confirmLabel="Delete"
      />
    </div>
  )
}

export default ComponentDemo
