import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Section } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { pageHead } from "@/lib/head";
import { tasks } from "@/lib/mock-data";
import { CheckCircle2, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/tasks/review")({
  head: () => pageHead("คิว Review งาน", "ตรวจงานที่เทรนนี่ส่งเข้ารีวิว อนุมัติหรือตีกลับพร้อม Feedback"),
  component: ReviewQueue,
});

function ReviewQueue() {
  const queue = tasks.filter((t) => t.status === "review");

  return (
    <AppShell
      title="คิว Review งาน"
      description={`มีงานรอตรวจ ${queue.length} รายการ`}
      roles="พี่เลี้ยง"
    >
      <div className="space-y-4">
        {queue.map((t) => (
          <Section key={t.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Link to="/tasks/$taskId" params={{ taskId: t.id }} className="text-base font-semibold hover:underline">
                  {t.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline">{t.id}</Badge>
                  <Badge variant="secondary">{t.project}</Badge>
                  <Badge variant="outline">ส่งโดย {t.assignee}</Badge>
                  <Badge variant="outline">กำหนดส่ง {t.due}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <CheckCircle2 className="size-4" /> อนุมัติ (Done)
                </Button>
                <Button variant="outline">
                  <RotateCcw className="size-4" /> ตีกลับงาน
                </Button>
              </div>
            </div>
            <Textarea className="mt-4" placeholder="กรอก Feedback กรณีตีกลับงาน..." />
          </Section>
        ))}
        {queue.length === 0 && (
          <Section>
            <p className="text-center text-sm text-muted-foreground">ไม่มีงานรอตรวจในขณะนี้</p>
          </Section>
        )}
      </div>
    </AppShell>
  );
}
