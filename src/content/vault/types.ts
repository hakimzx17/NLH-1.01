export type VaultCategory =
  | 'ccna-must-know'
  | 'osi-tcp-ip'
  | 'cli-reference'
  | 'protocol-facts'
  | 'glossary'
  | 'exam-traps';

export type VaultItemContent = string;

export type VaultItem = {
  id: string;
  category: VaultCategory;
  title: string;
  content: VaultItemContent;
  tags: string[];
  relatedLessonId?: string;
};

export type VaultBookmark = {
  itemId: string;
  bookmarkedAt: string;
};
