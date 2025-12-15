import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ArrowLeft } from 'lucide-react';
import { mockDonors, mockCampaigns } from '../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface DonationFormProps {
  donorId?: string;
  onBack: () => void;
  onSave: () => void;
}

export function DonationForm({ donorId, onBack, onSave }: DonationFormProps) {
  const [formData, setFormData] = useState({
    donorId: donorId || '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'credit-card',
    campaignId: '',
    recurring: false,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.donorId || !formData.amount) {
      toast.error('Please fill in required fields');
      return;
    }

    const donor = mockDonors.find(d => d.id === formData.donorId);
    const campaign = formData.campaignId
      ? mockCampaigns.find(c => c.id === formData.campaignId)
      : null;

    const jsonBody = {
      donorId: formData.donorId,
      amount: parseFloat(formData.amount),
      date: formData.date,
      method: formData.method,
      campaignId: formData.campaignId || null,
      recurring: formData.recurring,
      notes: formData.notes || null,
    };

    console.log('POST /api/donations', JSON.stringify(jsonBody, null, 2));
    
    // Simulate sending thank you email notification
    if (donor) {
      console.log('📧 Automated Thank You Email Queued:');
      console.log({
        to: donor.email,
        subject: 'Thank You for Your Generous Donation',
        body: `Dear ${donor.name},\n\nThank you for your donation of $${parseFloat(formData.amount).toLocaleString()}!\n\nYour support makes a tremendous difference.`,
        scheduledFor: 'immediate',
      });
    }
    
    toast.success('Donation logged successfully', {
      description: `Thank you email will be sent to ${donor?.email}`,
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Log a Donation</CardTitle>
          <CardDescription>
            Record a new donation. This will trigger a thank-you workflow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Selection */}
            <div className="space-y-2">
              <Label htmlFor="donor">Donor *</Label>
              <Select
                value={formData.donorId}
                onValueChange={(value) => setFormData({ ...formData, donorId: value })}
              >
                <SelectTrigger id="donor">
                  <SelectValue placeholder="Select a donor" />
                </SelectTrigger>
                <SelectContent>
                  {mockDonors.map(donor => (
                    <SelectItem key={donor.id} value={donor.id}>
                      {donor.name} - {donor.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="pl-7"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="method">Payment Method *</Label>
              <Select
                value={formData.method}
                onValueChange={(value) => setFormData({ ...formData, method: value })}
              >
                <SelectTrigger id="method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campaign */}
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign (Optional)</Label>
              <Select
                value={formData.campaignId}
                onValueChange={(value) => setFormData({ ...formData, campaignId: value })}
              >
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Select a campaign (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {mockCampaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recurring */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="recurring">Recurring Donation</Label>
                <p className="text-sm text-muted-foreground">
                  This is a recurring monthly donation
                </p>
              </div>
              <Switch
                id="recurring"
                checked={formData.recurring}
                onCheckedChange={(checked) => setFormData({ ...formData, recurring: checked })}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any relevant notes..."
                rows={3}
              />
            </div>

            {/* JSON Preview */}
            <div className="space-y-2">
              <Label>JSON Body (for POST request):</Label>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                {JSON.stringify(
                  {
                    donorId: formData.donorId || 'string',
                    amount: formData.amount ? parseFloat(formData.amount) : 0,
                    date: formData.date,
                    method: formData.method,
                    campaignId: formData.campaignId || null,
                    recurring: formData.recurring,
                    notes: formData.notes || null,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Log Donation
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}