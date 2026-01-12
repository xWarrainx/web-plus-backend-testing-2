import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // act
      const result = postsService.findMany();

      // assert
      expect(result).toHaveLength(4);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
      expect(result[3].text).toBe('Post 4');
    });

    it('should return correct posts for skip and limit options', () => {
      // arrange
      const options = { skip: 1, limit: 2 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    // ДОБАВЛЕННЫЕ ТЕСТ-КЕЙСЫ:

    it('should return empty array when skip is greater than posts count', () => {
      // arrange
      const options = { skip: 10 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should return correct posts when only skip is provided', () => {
      // arrange
      const options = { skip: 2 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return correct posts when only limit is provided', () => {
      // arrange
      const options = { limit: 2 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
    });

    it('should return empty array when limit is 0', () => {
      // arrange
      const options = { limit: 0 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should return correct posts when limit is greater than posts count', () => {
      // arrange
      const options = { limit: 10 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(4);
      expect(result[0].text).toBe('Post 1');
      expect(result[3].text).toBe('Post 4');
    });

    it('should return correct posts when skip is 0', () => {
      // arrange
      const options = { skip: 0, limit: 2 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
    });

    it('should handle negative skip (treat as 0)', () => {
      // arrange
      const options = { skip: -1, limit: 2 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
    });

    it('should handle negative limit (treat as 0)', () => {
      // arrange
      const options = { skip: 1, limit: -1 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should return correct posts when skip+limit exceeds posts count', () => {
      // arrange
      const options = { skip: 2, limit: 5 };

      // act
      const result = postsService.findMany(options);

      // assert
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });
  });
});