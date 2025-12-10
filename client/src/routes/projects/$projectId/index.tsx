import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { DragAndDrop } from '@/components/DragAndDrop';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { AnalyticsCardForProject } from '@/components/projects/AnalyticsCardForProject';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetSingleProject } from '@/hooks/useGetSingleProject';
import { useUpdateLeadStatus } from '@/hooks/useUpdatedLeadStatus';
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useForm } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import type { Lead } from '@/types';
import { useState } from 'react';
import { useCreateLead } from '@/hooks/useCreateLead';

export const Route = createFileRoute('/projects/$projectId/')({
  component: ProjectRoute,
});

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(32, "Name must be at most 32 characters."),
  company: z.string().min(2, 'Company must be at least 2 characters.'),
  email: z.email(),
  jobTitle: z.string(),
  notes: z.string().max(100, "Notes must be at most 100 characters."),
});

function ProjectRoute() {
  const { mutate: createLead } = useCreateLead();
  const { projectId } = Route.useParams();

  const form = useForm({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      jobTitle: "",
      notes: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      createLead({
        ...value,
        projectId
      });

      setOpen(false);
      form.reset();
    }
  });
  const [open, setOpen] = useState(false);

  const { data: project, isLoading } = useGetSingleProject(projectId);

  const updateLeadStatus = useUpdateLeadStatus();

  if (isLoading || !project) return <div>Loading…</div>;

  const { name, description, emailCount, leads } = project;

  const handleUpdateLead = (id: string, status: Lead['status']) => {
    // optimistic update directly in query cache
    updateLeadStatus.mutate({ id, status });
  };

  return (
    <div className="min-h-screen">
      <Header hasBackButton />
      <div className="p-4 container mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>

          {/* Analytics cards */}
          <AnalyticsCardForProject leads={leads} emailCount={emailCount} />

          <div className='flex justify-between'>
            <div>
              <h3 className="text-2xl font-bold">Outreach Pipeline</h3>
              <p className='text-muted-foreground mt-1'>Drag leads between stages to track progress</p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button><Plus />Add Lead</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adding new lead</DialogTitle>
                  <DialogDescription className='mt-0'>The lead will be added to the new column</DialogDescription>
                </DialogHeader>

                <form
                  className='space-y-6'
                  onSubmit={(e) => {
                    e.preventDefault();

                    void form.handleSubmit();
                  }}
                >
                  <FieldGroup>
                    <form.Field
                      name="name"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="Name"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="company"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Company</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="Acme"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="email"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="hello@example.com"
                              autoComplete="off"
                              type='email'
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="jobTitle"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Job Title</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="CEO"
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="notes"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                            <InputGroup>
                              <InputGroupTextarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => field.handleChange(e.target.value)}
                                placeholder="Notes about the lead"
                                rows={2}
                                className="min-h-24 resize-none"
                                aria-invalid={isInvalid}
                              />
                              <InputGroupAddon align="block-end">
                                <InputGroupText className="tabular-nums">
                                  {field.state.value.length}/100 characters
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </FieldGroup>
                  <DialogFooter>
                    <DialogClose asChild>

                      <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button type='submit'>Submit</Button>
                  </DialogFooter>
                </form>

              </DialogContent>
            </Dialog>
          </div>

          {/* DnD Pipeline */}
          <DragAndDrop leads={leads} onUpdateLead={handleUpdateLead} />

        </div>
      </div>
    </div >
  );
}