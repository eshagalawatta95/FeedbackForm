using Microsoft.EntityFrameworkCore;

public class FeedbackContext : DbContext
{
    public FeedbackContext(DbContextOptions<FeedbackContext> options)
        : base(options)
    {
    }

    public DbSet<Feedback> Feedbacks { get; set; }
    // Add DbSet properties for other entities as needed
}
