'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search, LayoutDashboard, Users, Building2, Menu, DollarSign, Calendar, Briefcase, FileText, Database, Shield, TrendingUp, AlertTriangle, FileText as AgendaIcon, MessageSquare as MinutesIcon, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Treemap, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts'
import { Badge } from "@/components/ui/badge"

interface Person {
  id: number
  name: string
  email: string
}

interface Vendor {
  id: number
  name: string
  email: string
  phone: string
  accountManagerId: number
}

interface Meeting {
  id: number
  title: string
  date: Date
  status: 'active' | 'past'
}

interface Contract {
  id: string
  name: string
  type: string
  summary: string
  status: 'Active' | 'Expired' | 'Pending'
  signDate: Date
  endDate: Date
  value: number
}

interface Obligation {
  id: string
  contractName: string
  description: string
  status: 'Pending' | 'Completed' | 'Overdue'
  dueDate: Date
  responsible: string
}

interface Risk {
  id: string
  category: string
  subCategory: string
  probability: number
  impact: number
  exposure: 'Low' | 'Moderate' | 'High'
}

interface ContactPerson {
  id: number
  name: string
  role: string
  email: string
  phone: string
}

const tcvByCategoryData = [
  { name: 'IT Services', size: 500000 },
  { name: 'Software', size: 300000 },
  { name: 'Hardware', size: 200000 },
  { name: 'Consulting', size: 150000 },
]

const tcvTrendData = [
  { month: 'Jan', value: 100000 },
  { month: 'Feb', value: 120000 },
  { month: 'Mar', value: 135000 },
  { month: 'Apr', value: 140000 },
  { month: 'May', value: 160000 },
  { month: 'Jun', value: 180000 },
]

const tcvBySupplierData = [
  { supplier: 'Acme Corp', value: 300000 },
  { supplier: 'Globex Corporation', value: 250000 },
  { supplier: 'Initech', value: 200000 },
  { supplier: 'Umbrella Corp', value: 150000 },
]

const tcvByContractData = [
  { contract: 'Contract A', value: 200000 },
  { contract: 'Contract B', value: 180000 },
  { contract: 'Contract C', value: 150000 },
  { contract: 'Contract D', value: 120000 },
  { contract: 'Contract E', value: 100000 },
]

const npsTrendData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 70 },
  { month: 'Apr', score: 72 },
  { month: 'May', score: 75 },
  { month: 'Jun', score: 78 },
]

const performanceMetrics = [
  { name: 'Quality of Service', value: 85 },
  { name: 'On-Time Delivery', value: 92 },
  { name: 'Continuous Improvement', value: 78 },
  { name: 'Technical Expertise', value: 88 },
  { name: 'Collaboration', value: 82 },
  { name: 'Communication', value: 90 },
  { name: 'Relationship Management', value: 86 },
  { name: 'Innovation', value: 75 },
  { name: 'Value-for-Money', value: 80 },
  { name: 'Budget Variance', value: 95 },
  { name: 'Availability-SLA', value: 99 },
  { name: 'Resolution Time', value: 87 },
  { name: 'Response Time', value: 93 },
]

const priority1IssuesTrendData = [
  { month: 'Jan', issues: 5 },
  { month: 'Feb', issues: 7 },
  { month: 'Mar', issues: 3 },
  { month: 'Apr', issues: 4 },
  { month: 'May', issues: 2 },
  { month: 'Jun', issues: 1 },
]

const sampleContracts: Contract[] = [
  {
    id: 'C001',
    name: 'Software License Agreement',
    type: 'License',
    summary: 'Annual software license for ERP system',
    status: 'Active',
    signDate: new Date('2023-01-15'),
    endDate: new Date('2024-01-14'),
    value: 50000
  },
  {
    id: 'C002',
    name: 'IT Support Services',
    type: 'Service',
    summary: 'Ongoing IT support and maintenance',
    status: 'Active',
    signDate: new Date('2023-03-01'),
    endDate: new Date('2024-02-29'),
    value: 75000
  },
  {
    id: 'C003',
    name: 'Hardware Supply Agreement',
    type: 'Supply',
    summary: 'Supply of computer hardware and peripherals',
    status: 'Pending',
    signDate: new Date('2023-06-01'),
    endDate: new Date('2024-05-31'),
    value: 100000
  },
  {
    id: 'C004',
    name: 'Cloud Storage Service',
    type: 'Service',
    summary: 'Provision of cloud storage and backup services',
    status: 'Active',
    signDate: new Date('2023-02-01'),
    endDate: new Date('2024-01-31'),
    value: 30000
  },
  {
    id: 'C005',
    name: 'Consulting Services Agreement',
    type: 'Service',
    summary: 'Strategic IT consulting services',
    status: 'Expired',
    signDate: new Date('2022-07-01'),
    endDate: new Date('2023-06-30'),
    value: 120000
  }
]

const sampleObligations: Obligation[] = [
  {
    id: 'OB001',
    contractName: 'Software License Agreement',
    description: 'Submit quarterly usage report',
    status: 'Pending',
    dueDate: new Date('2023-06-30'),
    responsible: 'John Doe'
  },
  {
    id: 'OB002',
    contractName: 'IT Support Services',
    description: 'Conduct monthly performance review',
    status: 'Completed',
    dueDate: new Date('2023-05-31'),
    responsible: 'Jane Smith'
  },
  {
    id: 'OB003',
    contractName: 'Hardware Supply Agreement',
    description: 'Place order for Q3 inventory',
    status: 'Overdue',
    dueDate: new Date('2023-05-15'),
    responsible: 'Bob Johnson'
  },
  {
    id: 'OB004',
    contractName: 'Cloud Storage Service',
    description: 'Renew annual subscription',
    status: 'Pending',
    dueDate: new Date('2023-12-31'),
    responsible: 'Alice Brown'
  },
  {
    id: 'OB005',
    contractName: 'Consulting Services Agreement',
    description: 'Schedule final project presentation',
    status: 'Pending',
    dueDate: new Date('2023-07-15'),
    responsible: 'Charlie Wilson'
  }
]

const sampleRisks: Risk[] = [
  {
    id: 'R001',
    category: 'Financial',
    subCategory: 'Currency Fluctuation',
    probability: 3,
    impact: 4,
    exposure: 'High'
  },
  {
    id: 'R002',
    category: 'Operational',
    subCategory: 'Supply Chain Disruption',
    probability: 2,
    impact: 5,
    exposure: 'High'
  },
  {
    id: 'R003',
    category: 'Compliance',
    subCategory: 'Regulatory Changes',
    probability: 4,
    impact: 3,
    exposure: 'Moderate'
  },
  {
    id: 'R004',
    category: 'Strategic',
    subCategory: 'Market Share Loss',
    probability: 2,
    impact: 4,
    exposure: 'Moderate'
  },
  {
    id: 'R005',
    category: 'Reputational',
    subCategory: 'Negative Publicity',
    probability: 1,
    impact: 5,
    exposure: 'Moderate'
  }
]

export function Page() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ])

  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '123-456-7890', accountManagerId: 1 },
    { id: 2, name: 'Globex Corporation', email: 'info@globex.com', phone: '987-654-3210', accountManagerId: 2 },
    { id: 3, name: 'Initech', email: 'support@initech.com', phone: '555-123-4567', accountManagerId: 3 },
  ])

  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: 1, title: 'Quarterly Review', date: new Date(2023, 5, 15), status: 'active' },
    { id: 2, title: 'Contract Negotiation', date: new Date(2023, 5, 20), status: 'active' },
    { id: 3, title: 'Performance Evaluation', date: new Date(2023, 4, 10), status: 'past' },
    { id: 4, title: 'Risk Assessment', date: new Date(2023, 4, 5), status: 'past' },
  ])

  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
  const [newVendor, setNewVendor] = useState<Omit<Vendor, 'id'>>({ name: '', email: '', phone: '', accountManagerId: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedVendor, setSelectedVendor] = useState('')
  const [activeManagementTab, setActiveManagementTab] = useState('data')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [contracts, setContracts] = useState<Contract[]>(sampleContracts)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [obligations, setObligations] = useState<Obligation[]>(sampleObligations)
  const [risks, setRisks] = useState<Risk[]>(sampleRisks)
  const [currentNPS, setCurrentNPS] = useState(78)
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([
    { id: 1, name: "Alice Johnson", role: "Account Manager", email: "alice@techpro.com", phone: "123-456-7890" },
    { id: 2, name: "Bob Smith", role: "Technical Lead", email: "bob@techpro.com", phone: "234-567-8901" },
    { id: 3, name: "Carol Williams", role: "Project Manager", email: "carol@techpro.com", phone: "345-678-9012" },
  ])
  const [newContactPerson, setNewContactPerson] = useState<Omit<ContactPerson, 'id'>>({ name: '', role: '', email: '', phone: '' })

  const Sidebar = () => (
    <div className="flex flex-col space-y-2 py-4">
      <Button variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} className="justify-start" onClick={() => setActiveTab('dashboard')}>
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </Button>
      <Button variant={activeTab === 'vendors' ? 'secondary' : 'ghost'} className="justify-start" onClick={() => setActiveTab('vendors')}>
        <Building2 className="mr-2 h-4 w-4" />
        Vendors
      </Button>
      <Button variant={activeTab === 'account-managers' ? 'secondary' : 'ghost'} className="justify-start" onClick={() => setActiveTab('account-managers')}>
        <Users className="mr-2 h-4 w-4" />
        Account Managers
      </Button>
      <Button variant={activeTab === 'management' ? 'secondary' : 'ghost'} className="justify-start" onClick={() => setActiveTab('management')}>
        <Briefcase className="mr-2 h-4 w-4" />
        Management
      </Button>
    </div>
  )

  const formatYAxis = (value: number) => {
    return `$${(value / 1000).toFixed(0)}K`
  }

  const addVendor = () => {
    if (newVendor.accountManagerId === 0) {
      alert("Please select an Account Manager")
      return
    }
    setVendors([...vendors, { ...newVendor, id: vendors.length + 1 }])
    setNewVendor({ name: '', email: '', phone: '', accountManagerId: 0 })
  }

  const updateVendor = () => {
    if (editingVendor) {
      if (editingVendor.accountManagerId === 0) {
        alert("Please select an Account Manager")
        return
      }
      setVendors(vendors.map(v => v.id === editingVendor.id ? editingVendor : v))
      setEditingVendor(null)
    }
  }

  const deleteVendor = (id: number) => {
    setVendors(vendors.filter(v => v.id !== id))
  }

  const getNPSColor = (score: number) => {
    if (score >= 70) return '#4CAF50'
    if (score >= 50) return '#FFC107'
    return '#F44336'
  }

  const getMetricColor = (value: number) => {
    if (value >= 90) return '#4CAF50'
    if (value >= 70) return '#FFC107'
    return '#F44336'
  }

  const getObligationStatusColor = (status: Obligation['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getExposureColor = (exposure: Risk['exposure']) => {
    switch (exposure) {
      case 'Low':
        return 'bg-green-100 text-green-800'
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800'
      case 'High':
        return 'bg-red-100 text-red-800'
    }
  }

  const addContactPerson = () => {
    setContactPersons([...contactPersons, { ...newContactPerson, id: contactPersons.length + 1 }])
    setNewContactPerson({ name: '', role: '', email: '', phone: '' })
  }

  const deleteContactPerson = (id: number) => {
    setContactPersons(contactPersons.filter(person => person.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold">VMS</h1>
        </div>
        <Sidebar />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute top-4 left-4">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="p-4">
            <h1 className="text-2xl font-bold">VMS</h1>
          </div>
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'vendors' && 'Vendor Management'}
                {activeTab === 'account-managers' && 'Account Managers'}
                {activeTab === 'management' && 'Management'}
              </h1>
              {activeTab === 'dashboard' && (
                <div className="flex space-x-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {tcvByCategoryData.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Vendors</SelectItem>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id.toString()}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            {activeTab === 'dashboard' && (
              <>
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Contract Value</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,150,000</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{vendors.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Categories</CardTitle>
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{tcvByCategoryData.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Contracts</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{tcvByContractData.length}</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>TCV Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={tcvTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={formatYAxis} />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>TCV by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <Treemap
                          data={tcvByCategoryData}
                          dataKey="size"
                          ratio={4 / 3}
                          stroke="#fff"
                          fill="#8884d8"
                        >
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        </Treemap>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>TCV by Supplier</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={tcvBySupplierData} layout="vertical" margin={{ left: 120 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={formatYAxis} />
                          <YAxis dataKey="supplier" type="category" width={100} />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>TCV by Contract</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={tcvByContractData} layout="vertical" margin={{ left: 120 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={formatYAxis} />
                          <YAxis dataKey="contract" type="category" width={100} />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend />
                          <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
            {activeTab === 'vendors' && (
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{editingVendor ? 'Edit Vendor' : 'Add New Vendor'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); editingVendor ? updateVendor() : addVendor() }} className="space-y-4">
                      <Input
                        placeholder="Vendor Name"
                        value={editingVendor ? editingVendor.name : newVendor.name}
                        onChange={(e) => editingVendor ? setEditingVendor({ ...editingVendor, name: e.target.value }) : setNewVendor({ ...newVendor, name: e.target.value })}
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={editingVendor ? editingVendor.email : newVendor.email}
                        onChange={(e) => editingVendor ? setEditingVendor({ ...editingVendor, email: e.target.value }) : setNewVendor({ ...newVendor, email: e.target.value })}
                      />
                      <Input
                        placeholder="Phone"
                        value={editingVendor ? editingVendor.phone : newVendor.phone}
                        onChange={(e) => editingVendor ? setEditingVendor({ ...editingVendor, phone: e.target.value }) : setNewVendor({ ...newVendor, phone: e.target.value })}
                      />
                      <Select
                        value={editingVendor ? editingVendor.accountManagerId.toString() : newVendor.accountManagerId.toString()}
                        onValueChange={(value) => {
                          const accountManagerId = parseInt(value)
                          editingVendor 
                            ? setEditingVendor({ ...editingVendor, accountManagerId }) 
                            : setNewVendor({ ...newVendor, accountManagerId })
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Account Manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {people.map((person) => (
                            <SelectItem key={person.id} value={person.id.toString()}>
                              {person.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="submit">{editingVendor ? 'Update' : 'Add'} Vendor</Button>
                      {editingVendor && (
                        <Button variant="outline" onClick={() => setEditingVendor(null)}>Cancel</Button>
                      )}
                    </form>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Account Manager</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vendors.map((vendor) => (
                          <TableRow key={vendor.id}>
                            <TableCell>{vendor.name}</TableCell>
                            <TableCell>{vendor.email}</TableCell>
                            <TableCell>{vendor.phone}</TableCell>
                            <TableCell>{people.find(p => p.id === vendor.accountManagerId)?.name}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => setEditingVendor(vendor)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => delete Vendor(vendor.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeTab === 'account-managers' && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Managers</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {people.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell>{person.name}</TableCell>
                          <TableCell>{person.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            {activeTab === 'management' && (
              <Card>
                <CardHeader>
                  <CardTitle>Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeManagementTab} onValueChange={setActiveManagementTab}>
                    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                      <TabsTrigger value="data">
                        <Database className="mr-2 h-4 w-4" />
                        Data
                      </TabsTrigger>
                      <TabsTrigger value="governance">
                        <Shield className="mr-2 h-4 w-4" />
                        Governance
                      </TabsTrigger>
                      <TabsTrigger value="performance">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Performance
                      </TabsTrigger>
                      <TabsTrigger value="contracts">
                        <FileText className="mr-2 h-4 w-4" />
                        Contracts
                      </TabsTrigger>
                      <TabsTrigger value="risks">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Risks
                      </TabsTrigger>
                      <TabsTrigger value="costs">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Costs
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="data">
                      <h3 className="text-lg font-semibold mb-4">Vendor Details</h3>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vendorName">Vendor Name</Label>
                            <Input id="vendorName" defaultValue="TechPro Solutions" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vendorLegalName">Vendor Legal Name</Label>
                            <Input id="vendorLegalName" defaultValue="TechPro Solutions Inc." />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" defaultValue="https://www.techprosolutions.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="officeAddress">Office Address</Label>
                            <Input id="officeAddress" defaultValue="123 Tech Avenue, Silicon Valley, CA 94000" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="registrationNumber">Registration Number</Label>
                            <Input id="registrationNumber" defaultValue="REG12345678" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taxId">Tax ID</Label>
                            <Input id="taxId" defaultValue="TAX987654321" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ownershipStructure">Ownership Structure</Label>
                            <Input id="ownershipStructure" defaultValue="Private Corporation" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="geographicalPresence">Geographical Presence</Label>
                            <Input id="geographicalPresence" defaultValue="North America, Europe, Asia" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="revenue">Revenue (Current Year)</Label>
                            <Input id="revenue" defaultValue="$50,000,000" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ebit">EBIT (Current Year)</Label>
                            <Input id="ebit" defaultValue="$10,000,000" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyDescription">Company Description</Label>
                          <Textarea 
                            id="companyDescription" 
                            className="min-h-[100px]"
                            defaultValue="TechPro Solutions is a leading provider of innovative software solutions for businesses of all sizes. With over a decade of experience, we specialize in developing cutting-edge applications that streamline operations, enhance productivity, and drive growth for our clients across various industries."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="keyOffers">Key Offers</Label>
                          <Textarea 
                            id="keyOffers" 
                            className="min-h-[100px]"
                            defaultValue="1. Enterprise Resource Planning (ERP) Software
2. Customer Relationship Management (CRM) Systems
3. Cloud-based Collaboration Tools
4. Artificial Intelligence and Machine Learning Solutions
5. Cybersecurity and Data Protection Services
6. Custom Software Development
7. IT Consulting and Strategy Services"
                          />
                        </div>
                        <Button type="submit">Save Vendor Details</Button>
                      </form>
                      
                      <h3 className="text-lg font-semibold mt-8 mb-4">Team Contact Persons</h3>
                      <div className="space-y-4">
                        <form onSubmit={(e) => { e.preventDefault(); addContactPerson() }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Input
                            placeholder="Name"
                            value={newContactPerson.name}
                            onChange={(e) => setNewContactPerson({ ...newContactPerson, name: e.target.value })}
                          />
                          <Input
                            placeholder="Role"
                            value={newContactPerson.role}
                            onChange={(e) => setNewContactPerson({ ...newContactPerson, role: e.target.value })}
                          />
                          <Input
                            type="email"
                            placeholder="Email"
                            value={newContactPerson.email}
                            onChange={(e) => setNewContactPerson({ ...newContactPerson, email: e.target.value })}
                          />
                          <Input
                            placeholder="Phone"
                            value={newContactPerson.phone}
                            onChange={(e) => setNewContactPerson({ ...newContactPerson, phone: e.target.value })}
                          />
                          <Button type="submit" className="md:col-span-2 lg:col-span-4">Add Contact Person</Button>
                        </form>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Phone</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {contactPersons.map((person) => (
                              <TableRow key={person.id}>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>{person.role}</TableCell>
                                <TableCell>{person.email}</TableCell>
                                <TableCell>{person.phone}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="icon" onClick={() => deleteContactPerson(person.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="governance">
                      <h3 className="text-lg font-semibold mb-4">Governance Meetings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Active Meetings</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {meetings.filter(m => m.status === 'active').map(meeting => (
                                <li key={meeting.id} className="flex justify-between items-center">
                                  <span>{meeting.title} - {meeting.date.toLocaleDateString()}</span>
                                  <div className="space-x-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <AgendaIcon className="h-4 w-4 mr-2" />
                                          Agenda
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Meeting Agenda: {meeting.title}</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4">
                                          <h4 className="font-semibold mb-2">Agenda Items:</h4>
                                          <ul className="list-disc pl-5 space-y-2">
                                            <li>Review previous action items</li>
                                            <li>Discuss current project status</li>
                                            <li>Address any blockers or issues</li>
                                            <li>Plan next steps and assign tasks</li>
                                          </ul>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <MinutesIcon className="h-4 w-4 mr-2" />
                                          Minutes
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Meeting Minutes: {meeting.title}</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4">
                                          <p className="mb-2">Date: {meeting.date.toLocaleDateString()}</p>
                                          <h4 className="font-semibold mb-2">Key Points Discussed:</h4>
                                          <ul className="list-disc pl-5 space-y-2">
                                            <li>Project timeline updated</li>
                                            <li>Budget allocation reviewed</li>
                                            <li>New risks identified and mitigation strategies proposed</li>
                                          </ul>
                                          <h4 className="font-semibold mt-4 mb-2">Action Items:</h4>
                                          <ul className="list-disc pl-5 space-y-2">
                                            <li>John to follow up on vendor contract by next week</li>
                                            <li>Jane to prepare risk assessment report for next meeting</li>
                                            <li>Team to review and provide feedback on new project proposal</li>
                                          </ul>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Past Meetings</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <Label htmlFor="datePicker">Select Date</Label>
                              <CalendarComponent
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                              />
                            </div>
                            <ul className="space-y-4">
                              {meetings.filter(m => m.status === 'past' && m.date <= (selectedDate || new Date())).map(meeting => (
                                <li key={meeting.id} className="flex justify-between items-center">
                                  <span>{meeting.title} - {meeting.date.toLocaleDateString()}</span>
                                  <div className="space-x-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <AgendaIcon className="h-4 w-4 mr-2" />
                                          Agenda
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Meeting Agenda: {meeting.title}</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4">
                                          <h4 className="font-semibold mb-2">Agenda Items:</h4>
                                          <ul className="list-disc pl-5 space-y-2">
                                            <li>Review previous meeting minutes</li>
                                            <li>Discuss project milestones</li>
                                            <li>Review budget and resource allocation</li>
                                            <li>Address any concerns or issues</li>
                                          </ul>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <MinutesIcon className="h-4 w-4 mr-2" />
                                          Minutes
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Meeting Minutes: {meeting.title}</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4">
                                          <p className="mb-2">Date: {meeting.date.toLocaleDateString()}</p>
                                          <h4 className="font-semibold mb-2">Key Points Discussed:</h4>
                                          <ul className="list-disc pl-5 space-y-2">
                                            <li>Project status reviewed and found to be on track</li>
                                            <li>Budget adjustments approved for Q3</li>
                                            <li>New team member onboarding process discussed</li>
                                          </ul>
                                          <h4 className="font-semibold mt-4 mb-2">Action Items:</h4>
                                          <ul className="list-disc pl-5 space-y-2">
                                            <li>Bob to update project timeline by end of week</li>
                                            <li>Jane to coordinate with HR on new hire orientation</li>
                                            <li>All team leads to submit Q3 budget proposals</li>
                                          </ul>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="performance">
                      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>Net Promoter Score (NPS)</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-center items-center h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                  cx="50%"
                                  cy="50%"
                                  innerRadius="60%"
                                  outerRadius="80%"
                                  barSize={10}
                                  data={[{ name: 'NPS', value: currentNPS }]}
                                  startAngle={180}
                                  endAngle={0}
                                >
                                  <RadialBar
                                    minAngle={15}
                                    background
                                    clockWise={true}
                                    dataKey="value"
                                    fill={getNPSColor(currentNPS)}
                                  />
                                  <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-3xl font-bold"
                                    fill="#333"
                                  >
                                    {currentNPS}
                                  </text>
                                </RadialBarChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>NPS Trend</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart data={npsTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="score" stroke="#8884d8" />
                              </LineChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Priority 1 Issues Trend</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart data={priority1IssuesTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="issues" stroke="#82ca9d" />
                              </LineChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                        {performanceMetrics.map((metric, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle>{metric.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-center items-center h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%"
                                    outerRadius="80%"
                                    barSize={10}
                                    data={[{ name: metric.name, value: metric.value }]}
                                    startAngle={180}
                                    endAngle={0}
                                  >
                                    <RadialBar
                                      minAngle={15}
                                      background
                                      clockWise={true}
                                      dataKey="value"
                                      fill={getMetricColor(metric.value)}
                                    />
                                    <text
                                      x="50%"
                                      y="50%"
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                      className="text-3xl font-bold"
                                      fill="#333"
                                    >
                                      {metric.value}%
                                    </text>
                                  </RadialBarChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="contracts">
                      <h3 className="text-lg font-semibold mb-4">Contract Management</h3>
                      <div className="space-y-6">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Contract ID</TableHead>
                                <TableHead>Contract Name</TableHead>
                                <TableHead>Contract Type</TableHead>
                                <TableHead>Summary</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Sign Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Value</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {contracts.map((contract) => (
                                <TableRow key={contract.id}>
                                  <TableCell>{contract.id}</TableCell>
                                  <TableCell>{contract.name}</TableCell>
                                  <TableCell>{contract.type}</TableCell>
                                  <TableCell>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <Eye className="h-4 w-4 mr-2" />
                                          View
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Contract Summary: {contract.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4">
                                          <p>{contract.summary}</p>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        contract.status === 'Active'
                                          ? 'default'
                                          : contract.status === 'Expired'
                                          ? 'destructive'
                                          : 'secondary'
                                      }
                                    >
                                      {contract.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{contract.signDate.toLocaleDateString()}</TableCell>
                                  <TableCell>{contract.endDate.toLocaleDateString()}</TableCell>
                                  <TableCell>${contract.value.toLocaleString()}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <h3 className="text-lg font-semibold mb-4">Obligations</h3>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Obligation ID</TableHead>
                                <TableHead>Contract Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Responsible</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {obligations.map((obligation) => (
                                <TableRow key={obligation.id}>
                                  <TableCell>{obligation.id}</TableCell>
                                  <TableCell>{obligation.contractName}</TableCell>
                                  <TableCell>{obligation.description}</TableCell>
                                  <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getObligationStatusColor(obligation.status)}`}>
                                      {obligation.status}
                                    </span>
                                  </TableCell>
                                  <TableCell>{obligation.dueDate.toLocaleDateString()}</TableCell>
                                  <TableCell>{obligation.responsible}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="risks">
                      <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
                      <p className="mb-4">Identify and mitigate vendor-related risks.</p>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Risk ID</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Risk Sub Category</TableHead>
                              <TableHead>Probability</TableHead>
                              <TableHead>Impact</TableHead>
                              <TableHead>Risk Exposure</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {risks.map((risk) => (
                              <TableRow key={risk.id}>
                                <TableCell>{risk.id}</TableCell>
                                <TableCell>{risk.category}</TableCell>
                                <TableCell>{risk.subCategory}</TableCell>
                                <TableCell>{risk.probability}</TableCell>
                                <TableCell>{risk.impact}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getExposureColor(risk.exposure)}`}>
                                    {risk.exposure}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="costs">
                      <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
                      <p className="mb-4">Analyze and optimize vendor-related costs.</p>
                      <div className="grid gap-4 md:grid-cols-2 mb-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>TCV Trend</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart data={tcvTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis tickFormatter={formatYAxis} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                              </LineChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>TCV by Category</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <Treemap
                                data={tcvByCategoryData}
                                dataKey="size"
                                ratio={4 / 3}
                                stroke="#fff"
                                fill="#8884d8"
                              >
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                              </Treemap>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 mb-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>TCV by Supplier</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={tcvBySupplierData} layout="vertical" margin={{ left: 120 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={formatYAxis} />
                                <YAxis dataKey="supplier" type="category" width={100} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>TCV by Contract</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={tcvByContractData} layout="vertical" margin={{ left: 120 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={formatYAxis} />
                                <YAxis dataKey="contract" type="category" width={100} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="value" fill="#82ca9d" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}