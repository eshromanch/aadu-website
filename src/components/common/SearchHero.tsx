import { SearchBar } from "@/components/common/SearchBar"

interface SearchHeroProps {
  onSearch?: () => void
}

export function SearchHero({ onSearch }: SearchHeroProps) {
  return <SearchBar variant="hero" onSearchComplete={onSearch} />
} 