DELETE FROM testimonials WHERE id IN (
  'tst-meridian-health','tst-harvestlink','tst-swiftaid','tst-vantage-goods','tst-openhands','tst-ledgerly'
);
DELETE FROM projects WHERE id IN (
  'prj-meridian-health','prj-harvestlink','prj-swiftaid','prj-vantage-goods','prj-openhands','prj-ledgerly'
);
DELETE FROM services WHERE id IN (
  'svc-product-engineering','svc-mobile-engineering','svc-digital-experience','svc-ai-automation','svc-growth','svc-continuous-support'
);
