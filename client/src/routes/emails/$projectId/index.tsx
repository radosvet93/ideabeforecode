import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import Header from '@/components/Header';
import { useGetSingleProject } from '@/hooks/project/useGetSingleProject';
import LeadsTable from '@/components/LeadsTable';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useForm } from '@tanstack/react-form';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { EmailToneValues, type EmailTone } from '@/types';
import { useGenerateEmail } from '@/hooks/lead/useGenerateEmail';

export const Route = createFileRoute('/emails/$projectId/')({
  component: EmailRoute,
});

function EmailRoute() {
  const { projectId } = Route.useParams();

  const { data: project } = useGetSingleProject(projectId);
  const { mutate: generateEmail } = useGenerateEmail();

  console.log('{project', project);

  const form = useForm({
    defaultValues: {
      leadId: "",
      tone: "professional",
    },
    validators: {
      onSubmit: z.object({
        leadId: z.string().min(1, "Lead is required"),
        tone: z.enum(EmailToneValues),
      })
    },
    onSubmit: ({ value }) => {
      if (!project) return;

      const lead = project.leads.find(lead => lead.id === value.leadId);

      if (!lead) return;

      const emailGenerationFields = {
        project: {
          name: project.name,
          description: project.description
        },
        lead: {
          name: lead.name,
          email: lead.email,
          status: lead.status,
          jobTitle: lead.status,
          company: lead.company,
          notes: lead.notes
        },
        tone: value.tone as EmailTone
      };

      generateEmail(emailGenerationFields);

      form.reset();
    }
  });

  return (
    <div className="min-h-screen">
      <Header hasBackButton />
      <div className="p-4 container mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Generate Emails</h2>
            <p className="text-muted-foreground mt-1">Generate emails with the help of AI</p>
          </div>

          <div className='flex gap-4'>

            <Card className='min-w-xs p-6 flex'>
              <form
                className='space-y-6'
                onSubmit={(e) => {
                  e.preventDefault();

                  void form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <form.Field
                    name="leadId"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <>
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Select a lead</FieldLabel>
                            <Select
                              value={field.state.value}
                              onValueChange={(value) => field.handleChange(value)}
                              aria-invalid={isInvalid}
                            >
                              <SelectTrigger className="w-full px-3 py-2 rounded-md border border-input bg-background">
                                <SelectValue placeholder="Choose a lead..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Lead</SelectLabel>
                                  {project?.leads.map((lead) => (
                                    <SelectItem key={lead.id} value={lead.id}>
                                      {lead.email}: {lead.name} - {lead.company}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        </>
                      );
                    }}
                  />
                  <form.Field
                    name="tone"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <>
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Tone</FieldLabel>
                            <Select
                              defaultValue={EmailToneValues[0]}
                              value={field.state.value}
                              onValueChange={(value) => field.handleChange(value)}
                              aria-invalid={isInvalid}
                            >
                              <SelectTrigger className="w-full px-3 py-2 rounded-md border border-input bg-background">
                                <SelectValue placeholder="Choose a tone..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Tone</SelectLabel>
                                  {EmailToneValues.map((tone) => (
                                    <SelectItem key={tone} value={tone}>
                                      <span className='first-letter:uppercase'>{tone}</span>
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        </>
                      );
                    }}
                  />
                </FieldGroup>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Generate email
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="flex-1 p-6 flex items-center justify-center text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">No email generated yet</h3>
                <p className="text-muted-foreground">Select a lead and click "Generate Email" to get started</p>
              </div>
            </Card>

          </div>
          <p>This will generate an email, with all the information from the project and the lead</p>
          <p>Then you can edit the email and click on send which will send the email, using your provided email</p>

          <hr />

          <LeadsTable leads={project?.leads ?? []} />

        </div>
      </div>
    </div>
  );
}