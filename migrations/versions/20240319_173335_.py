"""empty message

Revision ID: a6a4b7315fc5
Revises: c698c30731d5
Create Date: 2024-03-19 17:33:35.231638

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a6a4b7315fc5'
down_revision = 'c698c30731d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('caption',
               existing_type=sa.TEXT(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('caption',
               existing_type=sa.TEXT(),
               nullable=False)

    # ### end Alembic commands ###